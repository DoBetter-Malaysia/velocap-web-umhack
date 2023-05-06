import { Founder } from "./founder";

export interface Startup {
  angel: number
  category_list: string
  convertible_note: number
  country_code: string
  debt_financing: number
  description: string
  equity_crowdfunding: number
  first_funding_at: string
  founded_at: string
  founders: Founder[]
  funding_rounds: number
  funding_total_usd: number
  grant: number
  homepage_url: string
  id: number
  last_funding_at: string
  market: string
  market_size: string
  name: string
  permalink: string
  picture: string
  post_ipo_debt: number
  post_ipo_equity: number
  private_equity: number
  product_crowdfunding: number
  round_A: number
  round_B: number
  round_C: number
  round_D: number
  round_E: number
  round_F: number
  round_G: number
  round_H: number
  secondary_market: number
  seed: number
  status: string
  undisclosed: number
  venture: number
  last_engagement_at: string
}
