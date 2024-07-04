export default function Heading(props) {
  const { headNumber, text, divClassName } = props;

  return headNumber === 1 ? (
    <div className={divClassName}>
      <h1>{text}</h1>
    </div>
  ) : headNumber === 2 ? (
    <h2>{text}</h2>
  ) : headNumber === 3 (
    <h3>{text}</h3>
  ) 
  
}
