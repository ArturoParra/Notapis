const H1 = ({ node, ...props }: { node?: any;[key: string]: any }) => <h1 className="text-4xl font-bold my-4 text-gray-900" {...props} />;
const P = ({ node, ...props }: { node?: any;[key: string]: any }) => <p className="text-base mb-4 leading-relaxed" {...props} />;
const A = ({ node, ...props }: { node?: any;[key: string]: any }) => <a className="text-blue-600 underline hover:text-blue-800" {...props} />;
const UL = ({ node, ...props }: { node?: any;[key: string]: any }) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />;

const markdownComponents = {
    h1: H1,
    p: P,
    a: A,
    ul: UL,
};

export default markdownComponents;