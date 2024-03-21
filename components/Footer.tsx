import { CgCopyright } from "react-icons/cg";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="mt-auto">
      <div className="bg-indigo-900 py-2 px-16 flex justify-between">
        <div className="flex justify-center text-gray">
          <p className="text-gray-500 text-[12px]">
            <a
              target="_blank"
              rel="noreferrer"
              href="/Privacy_Policy_DataDiveHomes.pdf"
            >
              {" "}
              Privacy Policy
            </a>
          </p>
        </div>
        <div className="flex justify-center text-gray">
          <CgCopyright color="#000000" />
          <p className="text-gray-500 text-[12px]">
            Copyright {year} - DATA DIVE HOMES | All rights reserved
          </p>
        </div>
        <div className="flex justify-center text-gray">
          <p className="text-gray-500 text-[12px]">
            <a target="_blank" rel="noreferrer" href="/sitemap-0.xml">
              {" "}
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
