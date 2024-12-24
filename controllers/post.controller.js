import instialData from "../db/db.js";
import CustErroHelper from "../utils/custErrorHelper.js";

//@Get All Post
const GetAllPost = (req, res, next) => {
    try {
        if (!instialData) {
            return res.status(412).json({
                success: false,
                message: "No data found."
            })
        }

        return res.status(200).json({
            success: true,
            data: instialData
        })
    } catch (error) {
        return CustErroHelper(next, error.message, 404);
    }
}


//@get Single Post
const GetSinglePost = async (req, res, next) => {

    try {
        const id = parseInt(req.params.id);

        if (!id) {
            return CustErroHelper(next, "No data found.", 412);
        }

        const filterData = await instialData.filter(curEle => curEle.id == id);
        if (!filterData.length) {
            return CustErroHelper(next, "No data found.", 412);
        }

        return res.status(200).json({
            success: true,
            data: filterData
        })

    } catch (error) {
        return CustErroHelper(next, error.message, 404);
    }
}


//@Add Post
const AddPost = async (req, res, next) => {
    try {
        const { userId, title, completed } = req.body;

        if (!userId || !title) {
            return CustErroHelper(next, "User Id & Title is required.", 404);
        }

        const isUserIdExist = instialData ? instialData.find(cur => cur.userId == userId) : 0;

        if (isUserIdExist) {
            return CustErroHelper(next, "User id already exist.", 404);
        }

        await instialData.push({
            "userId": userId,
            "id": instialData.length + 1,
            "title": title,
            "completed": completed && false
        })

        return res.status(200).json({
            success: true,
            message: "New post has been added successfull.",
            data: instialData
        })

    } catch (error) {
        return CustErroHelper(next, error.message, 404);
    }
}

//@update post
const UpdatePost = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { userId, title, completed } = req.body;

        if (!id) {
            return CustErroHelper(next, "Post not exist.", 400);
        }

        if (!userId) {
            return CustErroHelper(next, "User id required.", 400);
        }

        const PostDuplicate = instialData ? instialData.find(cur => cur.userId == userId && cur.userId != id) : 0;
        if (PostDuplicate) {
            return CustErroHelper(next, "Post duplicate found.", 400);
        }

        const findIndex = instialData ? instialData.findIndex(cur => cur.userId == userId) : false;
        if (findIndex === false) {
            return CustErroHelper(next, "Post not exist.", 404);
        }

        const newData = instialData[findIndex] = {
            ...instialData[findIndex],
            userId,
            title,
            completed
        }

        return res.status(200).json({
            success: true,
            message: "Post has been updated successfull.",
            data: newData
        })

    } catch (error) {
        return CustErroHelper(next, error.message, 404);
    }
}

export { GetAllPost, GetSinglePost, AddPost, UpdatePost }