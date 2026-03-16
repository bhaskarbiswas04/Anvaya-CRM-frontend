export default function PageLoader({ text = "Loading..." }) {
  return (
    <div className="p-4 bg-light min-vh-100">
      <div className="text-center mb-3">
        <strong>{text}</strong>
      </div>

      <div
        className="progress"
        style={{ height: "8px", maxWidth: "400px", margin: "0 auto" }}
      >
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{ width: "100%" }}
        ></div>
      </div>
    </div>
  );
}
