const fetch = require("node-fetch");
const { GoogleSpreadsheet } = require("google-spreadsheet");
// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
export function handler(event, context, callback) {
  console.log("queryStringParameters", event.queryStringParameters);
  fetchData();

  async function fetchData() {
    let date = new Date().toISOString();
    let requestBody = {
      query: `
        {
          posts(order:VOTES, featured: true, first:5, postedAfter:${date}) {
            totalCount
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                name
                description
                url
                topics {
                  edges {
                    node {
                       name
                    }
                  }
                }
                votesCount
                media {
                  videoUrl
                  url
                }
                tagline
              
                createdAt
              
                
              }
            }
            
          }
        }
        
        
          `,
    };

    await fetch("https://api.producthunt.com/v2/api/graphql", {
      headers: {
        authorization:
          "Bearer 61d6893969383fb5c22487e2185abb0b00adf1b47f1326fa0670e6cd68a6405e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      method: "POST",
    })
      .then((response) => {
        console.log(response.status);
        if (response.status !== 200) throw new Error("Error");
        return response.json();
      })
      .then((response) => {
        organizeData(response);
        data = response.data;
      })
      .catch((err) => {});

    return data;
  }

  function organizeData(response) {
    console.log(response.data.posts.pageInfo);
    endCursor = response.data.posts.pageInfo.endCursor;
    console.log(endCursor);
    console.log(endCursor);
    let filterData = response.data.posts.edges.filter(
      (post) => post.node.media[0].videoUrl !== null
    );

    console.log(filterData.length);

    if (filterData.length > 0) {
      filterData.reduce(async (acc, el) => {
        console.log(acc);
        const found = acc.find((a) => el.node.name !== a.node.name);
        //const value = { name: d.name, val: d.value };
        if (!found) {
          //acc.push(...value);
          await acessSepreadSheet(
            el.node.name,
            el.node.topics.edges[0].node.name,
            el.node.votesCount,
            el.node.media[0].videoUrl,
            el.node.url,
            el.node.media[1].url,
            el.node.description,
            el.node.createdAt
          );
        }

        return acc;
      }, []);
    } else {
      fetchData();
    }
  }
  async function acessSepreadSheet(
    productName,
    topic,
    votesCount,
    videoUrl,
    url,
    featuredImage,
    description,
    createdAt
  ) {
    const doc = new GoogleSpreadsheet(
      "1_6yDIrj5-7w9Qc3sKAABPt-ifScogV4I-2PtFnFbHeo"
    );
    await doc.useServiceAccountAuth(require("../../sheet.json"));
    const info = await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

    console.log(createdAt);
    const row = {
      productName,
      topic,
      votesCount,
      videoUrl,
      featuredImage,
      url,
      description,
      createdAt,
    };
    await sheet.addRow(row);
    await callback(null, {
      // return null to show no errors
      statusCode: 200, // http status code

      body: JSON.stringify({
        msg: "Hello, World! " + Math.round(Math.random() * 10),
      }),
    });
  }
}
