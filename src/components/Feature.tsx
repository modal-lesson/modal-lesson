import { FolderIcon, GlobeIcon, NewspaperIcon, PlanbookIcon } from "./SvgIcons";

export function Feature() {
  return (
    <section className="bg-base-300 rounded-xl p-10 my-20">
      <div className="flex flex-col items-center mb-16">
        <span className="text-primary font-bold mb-5">Plan faster!</span>
        <h3 className="text-4xl font-bold mb-8">
          Everything you need to plan fast.
        </h3>
        <p className="text-center text-lg mb-10 w-[800px]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          repellendus itaque unde optio delectus? Aliquam odio similique
          asperiores pariatur dolores quas exercitationem dolor quos, eius
          minima et, est, necessitatibus architecto.
        </p>
      </div>

      <div className="grid grid-cols-2 justify-items-center">
        {FEATURE_SECTION_POST.map((feature) => (
          <div key={feature.title} className="flex gap-2">
            <span>{feature.icon}</span>

            <div>
              <h4 className="text-base font-bold mb-2">Random Text</h4>
              <p className="w-72 mb-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, quia?
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const FEATURE_SECTION_POST = [
  {
    title: "Section 1",
    description: "A section with a title, description, and a list of features",
    icon: PlanbookIcon(),
  },
  {
    title: "Section 2",
    description: "A section with a title, description, and a list of features",
    icon: FolderIcon(),
  },
  {
    title: "Section 3",
    description: "A section with a title, description, and a list of features",
    icon: GlobeIcon(),
  },
  {
    title: "Section 4",
    description: "A section with a title, description, and a list of features",
    icon: NewspaperIcon(),
  },
];
