require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//add cors to express(cors allow sending messages to and from domains)
const configuration = new Configuration({
  organization: process.env.REACT_APP_OPENAI_ORGANIZATION,
  apiKey: process.env.REACT_APP_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0125", //text-davinci-003
    //prompt: `${message}`,
    messages: [
      { role: "system", content: `${message}` },
      // You can add more messages if needed, like user messages or prompts.
    ],
    max_tokens: 1000,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].message.content,
    //text,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
