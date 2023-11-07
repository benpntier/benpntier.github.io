import './index.scss'

function Rating({ stars }) {
  const range = [1, 2, 3, 4, 5]
  return (
    <div className="rating">
      {range.map((star) =>
        stars >= star ? (
          // Full star
          <i
            key={star}
            className="fa-solid fa-star rating__star rating__star--full"
          ></i>
        ) : (
          // Empty star
          <i
            key={star}
            className="fa-solid fa-star rating__star rating__star--empty"
          ></i>
        )
      )}
    </div>
  )
}

export default Rating
