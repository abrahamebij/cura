import { FaChartLine, FaFileInvoiceDollar } from "react-icons/fa";
import { MdManageAccounts, MdSchedule } from "react-icons/md";

export default function FeaturesSection() {
  const features = [
    {
      icon: <MdManageAccounts />,
      title: "Patient Management",
      description:
        "Streamlined patient registration, history tracking, and document management for better care coordination.",
    },
    {
      icon: <MdSchedule />,
      title: "Smart Scheduling",
      description:
        "AI-powered appointment booking that reduces wait times and optimizes staff availability.",
    },
    {
      icon: <FaChartLine />,
      title: "Medical Analytics",
      description:
        "Gain insights from patient data to improve treatment planning and hospital operations.",
    },
    {
      icon: <FaFileInvoiceDollar />,
      title: "Simplified Billing",
      description:
        "Automated billing processes with transparent cost breakdown and insurance integration.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 sm:text-4xl">
            Comprehensive Healthcare Management
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base lg:text-xl text-gray-500">
            Cura streamlines every aspect of hospital operations to improve
            patient care and staff efficiency.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-12 w-12 mx-auto mb-4 flex items-center justify-center rounded-md bg-blue-100 text-2xl text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-900 text-center">
                {feature.title}
              </h3>
              <p className="mt-3 text-base text-gray-500 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
