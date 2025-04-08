const ProductCard = ({ image, title, price, category }) => {
  return (
    <div className="product-card p-5 m-5 w-[200px] hover:scale-90 justify-center items-center">
      <img className="object-cover rounded-lg" src={image} alt={title} />
      <span className="title font-semibold">{title}</span>
      <h1 className="font-semibold mt-1">$ {price}</h1>
      <h1 className="font-semibold mt-1">{category}</h1>
    </div>
  );
};

export default ProductCard;
