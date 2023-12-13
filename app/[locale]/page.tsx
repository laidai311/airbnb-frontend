import { Metadata } from "next"
import { LP_GRID_ITEMS } from "@/lp-items"
import { Button } from "components/Button/Button"

import HomeCard from "@/components/HomeCard/HomeCard"
import HomeFilter from "@/components/HomeFilter/HomeFilter"

export const metadata: Metadata = {
  title: "My Page Title",
}

export default function Page() {
  return (
    <>
      <HomeCard />
      <HomeFilter />
    </>
  )
}
