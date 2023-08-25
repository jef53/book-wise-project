import { Star } from "@phosphor-icons/react"
import { ComponentProps } from "@stitches/react"
import { useState } from "react"
import { ratings } from "../../../prisma/constants/ratings"
import { Container } from "./styles"

type RatingStarsProps = ComponentProps<typeof Container> & {
  rating: number,
  size?: "sm" | "md" | "lg"
  setRating?: (rating: number) => void

}

export const RatingStars = ({ rating, setRating, size = "sm", ...props }: RatingStarsProps) => {
  const isEditable = !!setRating;

  const [previewRate, setPreviewRate] = useState(0);

  const rateValue = isEditable ? previewRate : rating;

  function handlePreviewRate(value: number) {
    setPreviewRate(value);
  }

  function handleMouseLeave() {
    setPreviewRate(rating);
  }

  function handleClickRate(value: number) {
    setPreviewRate(value);
    if (!!setRating) setRating(value);
  }


  return (
    <Container css={{ cursor: 'pointer' }} size={size} {...props}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={`star-${i}`}
          weight={(i + 1) <= rateValue ? "fill" : "regular"}
          onMouseMove={() => { handlePreviewRate(i + 1) }}
          onMouseLeave={handleMouseLeave}
          onClick={() => { handleClickRate(i + 1) }}
        />
      ))}
    </Container>
  )
}