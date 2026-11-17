export default function StepIndicator() {
  const steps = [1, 2, 3, 4, 5];

  return (
    <div className="steps">
      <ol className="wrap step-list" aria-label="Шаги записи">
        {steps.map((number) => {
          let classes = "step";
          if (number < 3) classes += " done";
          if (number === 3) classes += " current";

          return (
            <li
              className={classes}
              key={number}
              aria-current={number === 3 ? "step" : undefined}
            >
              <span className="number">{number}</span>
              <span className="line"></span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
