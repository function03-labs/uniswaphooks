import { Icons } from "@component/overall/Icons";

const steps = [
  { id: "01", name: "Hook details", href: "#", status: "current" },
  { id: "02", name: "Hook deployment", href: "#", status: "upcoming" },
  { id: "03", name: "Submission", href: "#", status: "upcoming" },
];

function CurrentStep({ step }: { step: (typeof steps)[0] }) {
  return (
    <a
      href={step.href}
      className="flex items-center px-6 py-4 text-sm font-medium"
      aria-current="step"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
        <span className="text-blue-600">{step.id}</span>
      </span>
      <span className="ml-4 text-sm font-medium text-blue-600">
        {step.name}
      </span>
    </a>
  );
}

function UpcomingStep({ step }: { step: (typeof steps)[0] }) {
  return (
    <a href={step.href} className="group flex items-center">
      <span className="flex items-center px-6 py-4 text-sm font-medium">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
          <span className="text-gray-500 group-hover:text-gray-900">
            {step.id}
          </span>
        </span>
        <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
          {step.name}
        </span>
      </span>
    </a>
  );
}

function CompleteStep({ step }: { step: (typeof steps)[0] }) {
  return (
    <a href={step.href} className="group flex w-full items-center">
      <span className="flex items-center px-6 py-4 text-sm font-medium">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-800">
          <Icons.check className="h-6 w-6 text-white" aria-hidden="true" />
        </span>
        <span className="ml-4 text-sm font-medium text-gray-900">
          {step.name}
        </span>
      </span>
    </a>
  );
}

export default function Panels() {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            {step.status === "complete" ? (
              <CompleteStep step={step} />
            ) : step.status === "current" ? (
              <CurrentStep step={step} />
            ) : (
              <UpcomingStep step={step} />
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                <div
                  className="absolute right-0 top-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
