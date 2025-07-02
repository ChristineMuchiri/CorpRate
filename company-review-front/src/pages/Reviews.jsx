export default function Reviews() {
  return (
    <div className="reviews-container fade-in">
      <h1 className="reviews-title">Company Reviews</h1>
      <p className="reviews-intro">
        Explore honest reviews from employees about their experiences at various companies.
      </p>

      <div className="reviews-list slide-in">
        {/* Example review cards */}
        <div className="review-card">
          <h3>TechCorp</h3>
          <p className="review-text">Great work-life balance and supportive management.</p>
          <div className="review-rating">Rating: ★★★★☆</div>
        </div>
        <div className="review-card">
          <h3>BizSolutions</h3>
          <p className="review-text">Fast-paced environment with excellent growth opportunities.</p>
          <div className="review-rating">Rating: ★★★☆☆</div>
        </div>
      </div>
    </div>
  );
}