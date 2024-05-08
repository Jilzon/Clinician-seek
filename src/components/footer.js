export default function FooterSection() {
  return (
    <footer className="bg-clr-footer1 text-white">
      <div className="container pt-16 pb-4  flex-col md:flex-row flex gap-[62px] md:gap-5 justify-between">
        <div>
        <a href="/" className="cursor-pointer">
          <img src="/images/clinician-seek-logo.svg" alt="" />
          </a>
        </div>
        <div>
          <h3 className="mb-6">Quicklinks</h3>
          <ul>
            <li className="pb-4">
              <a href="/" className="hover:underline underline-offset-2">
                Home
              </a>
            </li>
            <li className="pb-4">
              <a href="/about-us" className="hover:underline underline-offset-2">
                About Us
              </a>
            </li>
            <li className="pb-4">
              <a href="" className="hover:underline underline-offset-2">
                Order Blind Weight Scale
              </a>
            </li>
            <li className="pb-4">
              <a href="" className="hover:underline underline-offset-2">
                FAQ
              </a>
            </li>
            <li className="pb-4">
              <a href="/contact-us" className="hover:underline underline-offset-2">
                Contact Us
              </a>
            </li>
            <li className="pb-4">
              <a href="" className="hover:underline underline-offset-2">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="" className="hover:underline underline-offset-2">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-6">Contact</h3>
          <ul>
            <li className="pb-4">
              <a
                href="tel:+44345678903"
                className="hover:underline underline-offset-2"
              >
                +44 345 678 903
              </a>
            </li>
            <li>
              <a
                href="mailto:info@clinicianseek.com"
                className="hover:underline underline-offset-2"
              >
                info@clinicianseek.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-6">Follow Us On</h3>
          <div className="flex gap-4">
            <div>
              <a href="">
                <img src="/images/Yelp.svg" alt="" />
              </a>
            </div>
            <div>
              <a href="">
                <img src="/images/google.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center text-xs leading-[1.05rem] w-full pb-4">
        <p>
          The content provided here and elsewhere on the Clinician Seek site or
          mobile app is provided for general informational purposes only. It is
          not intended as, and Clinician Seek does not provide, medical advice,
          diagnosis or treatment. Always contact your healthcare provider
          directly with any questions you may have regarding your health or
          specific medical advice.
        </p>
      </div>
      <div className="bg-clr-footer2 py-4 px-5 text-center text-sm text-white">
        <span>© 2023 · Clinician Seek LLC</span>
      </div>
    </footer>
  );
}
