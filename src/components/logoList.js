export default function LogoList({ logos, customClasses }) {
  return (
    <div className={`logo-list ${customClasses}`}>
      {logos &&
        logos.map((item, i) => (
          <figure key={i}>
            <img src={item} />
          </figure>
        ))}
    </div>
  );
}
