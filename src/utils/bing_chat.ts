import { BingChat } from "bing-chat";

async function bingPredict(question: string) {
  const api = new BingChat({
    cookie:
      "_U=1rN01PfZrAWztlvXMxbVNXf7BdBRo44mnqEMVahfc20W0rOJE-JxcJOU-aFKHYv6pQxDcBHjVnkYpTt-UpXmec27Ht_6xWWq5vAlG4x5tEXcEOUQ94OfawewePKz9DeB-ONVlSHtaVjYtFdKx6Ffe1CpCH9Gpzn7N1K6ZZOoJjkhIGR64MP2HkOIZOZSwSBvCgXc3M0cnLuWpp4PU5tpUyQ;",
  });
  console.log(question);

  const res = await api.sendMessage(question);
  return res.text;
}

export default bingPredict;
