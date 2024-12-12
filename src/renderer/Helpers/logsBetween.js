import { useRef, useEffect } from "react";

const useLoggedRef = (initialValue) => {
    const ref = useRef(initialValue);

    // Create a proxy to intercept changes to ref.current
    const proxy = new Proxy(ref, {
        set(target, property, value) {
            if (property === "current") {
                // console.log(`dummyRef: ${value}`);
            }
            target[property] = value;
            return true;
        },
    });

    return proxy;
};

const MyComponent = () => {
    const dummyRef = useLoggedRef(0);

    const rrr = () => {
        console.log("log 1");
        dummyRef.current = 200; // Proxy logs automatically
        console.log("log 2");
        dummyRef.current = 2; // Proxy logs automatically
        console.log("log 3");
    };

    console.log(`xxxxxx : `, dummyRef);

    useEffect(() => {
        rrr();
    }, []);

    return null;
};

export default MyComponent;
