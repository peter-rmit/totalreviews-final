import jwt from "jsonwebtoken";

export const validateToken = (tokenn) => {
    const token = tokenn;
    console.log({ token })
    try {
        const data = jwt.decode(token);
        console.log({ data })
        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

