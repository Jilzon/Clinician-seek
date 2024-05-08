import "./_loader.scss";
export default function Loader({ animation, classes }) {
  return (
    <div className={`spinner-box w-fit ${classes}`}>
      {animation && animation == "dots" ? (
        <div className="pulse-container">
          <div className="pulse-bubble pulse-bubble-1"></div>
          <div className="pulse-bubble pulse-bubble-2"></div>
          <div className="pulse-bubble pulse-bubble-3"></div>
        </div>
      ) : (
        <div className="circle-border">
          <div className="circle-core"></div>
        </div>
      )}
    </div>
  );
}
