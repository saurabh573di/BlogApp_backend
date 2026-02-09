import UserModel from "../models/User.model.js";
import ErrorResponse from "../utils/ErrorResponse.util.js";

export const getUsers = async (req, res, next) => {
  try {
    let allUsers = await UserModel.find();
    if (allUsers.length === 0) {
      throw new ErrorResponse("No users found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: allUsers.length,
      data: allUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true, // display the updated document
      runValidators: true, // to validate the updated data
    });

    if (!updatedUser)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  let userId = req.params.id;
  let deletedUser = await UserModel.findByIdAndDelete(userId);

  if (!deletedUser)
    return res.status(404).json({
      success: false,
      message: "No user found",
    });

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
  });
};

//! blogs