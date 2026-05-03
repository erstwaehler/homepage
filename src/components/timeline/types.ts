export type CycleDetail = {
  label: string;
  duration: string;
  description: string;
};

export type TimelineRow =
  | {
      kind: "section";
      time: string;
      room: string;
      title: string;
      details?: string;
    }
  | {
      kind: "cycle";
      time: string;
      room: string;
      title: string;
      details: CycleDetail[];
    }
  | {
      kind: "end";
      time: string;
      room: string;
      title: string;
      details?: string;
    };
