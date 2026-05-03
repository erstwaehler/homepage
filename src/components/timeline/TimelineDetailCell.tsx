import { memo, useState } from "react";

type TimelineDetailCellProps = {
  text: string;
  className?: string;
  maxChars?: number;
};

function TimelineDetailCellComponent({
  text,
  className = "",
  maxChars = 40,
}: TimelineDetailCellProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortText =
    text.length > maxChars ? `${text.slice(0, maxChars).trimEnd()}…` : text;

  return (
    <button
      type="button"
      className={["group relative", className].join(" ")}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
    >
      <p
        className={[
          "max-w-[30ch] overflow-hidden text-sm text-muted-foreground transition-all duration-300",
          isExpanded
            ? "max-w-none whitespace-normal text-left"
            : "truncate text-left",
        ].join(" ")}
      >
        {shortText}
      </p>
    </button>
  );
}

const TimelineDetailCell = memo(TimelineDetailCellComponent);

export default TimelineDetailCell;
