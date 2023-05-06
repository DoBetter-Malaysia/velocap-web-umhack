// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bingPredict from '@/utils/bing_chat'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  response: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body.question);
    const val = await bingPredict(req.body.question);
    res.status(200).json({ response: val })
}
