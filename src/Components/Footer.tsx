const Footer = () => {
  return (
    <footer className="bg-gray-300 p-4 fixed bottom-0 w-full">
      <div className="container mx-auto">
        <p className="text-gray-600 text-center">
          © {new Date().getFullYear()} Levvia. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
