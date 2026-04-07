import { ReactNode } from "react";

type CardProps = {
  title: string;
  subtitle: string;
  accent: "coral" | "teal" | "gold";
  children: ReactNode;
};

export function Card({ title, subtitle, accent, children }: CardProps) {
  return (
    <section className={`panel-card accent-${accent}`}>
      <header className="panel-head">
        <div>
          <p className="panel-title">{title}</p>
          <p className="panel-subtitle">{subtitle}</p>
        </div>
      </header>
      {children}
    </section>
  );
}
