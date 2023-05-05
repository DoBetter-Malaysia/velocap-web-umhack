import Quote from "@/components/icons/Quote";
import ArrowLink from "@/components/links/ArrowLink/ArrowLink";
import { List } from "@mantine/core";

interface StatCardProps {
  title: string;
  content: string[];
  link: string;
}

const StatCard = ({ title, content, link }: StatCardProps) => {
  return (
    <div className="relative max-w-lg space-y-3 rounded-2xl bg-blue-100/90 px-12 py-20">
      <div
        style={{ fontFamily: "Times New Roman" }}
        className="absolute left-12 top-12 text-6xl font-bold text-blue-600/25"
      >
        {"“"}
      </div>
      <h3 className="text-2xl">{title}</h3>
      <List spacing="0" className="list-disc">
        {content.map((text, key) => (
          <List.Item key={key} className="text-slate-600">
            {text}
          </List.Item>
        ))}
      </List>
      <ArrowLink href="https://google.com">Learn More</ArrowLink>
    </div>
  );
};

export default StatCard;
