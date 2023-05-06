import { BingChat } from "bing-chat";

async function bingPredict(question: string) {
  const api = new BingChat({
    cookie: "_U=1BBcS762Ylh1Kah05V8VciSYGS3F1-6lstFdDAGz3eNz5NuBHOmMgBF5YjLWkPlI2m84RBlzn557W67X7ihaQeBDtO2LsWei5wwifkfUNKIW16xmn4Ujy6LilLBBBspG9gtRHQemrMqne_-mfR8nPYEZLt6r1luyYdQNk8aJ7u9-C4KEE_LlP5nWj-5_hJ_0fzfE6aiVgOGtqMBC2NalR-aZLVFVgmIP7nfk1JgrxXpA;",
  });
  console.log(question);

  const res = await api.sendMessage(question);
  return res.text;
}

export default bingPredict;
