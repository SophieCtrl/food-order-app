export default function Button({ children, textOnly, ...props }) {
  let cssClasses = textOnly ? "text-button" : "button";

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
