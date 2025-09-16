import Coupons from "../model/coupons.model.js";

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupons.find({
      userId: req.user._id,
      isActive: true,
    });
    res.status(200).json(coupons);
  } catch (error) {
    console.log(`Error inside getCoupons controller : ${error.message}`);
    res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};

export const validateCoupon = async (req, res) => {
  const { code } = req.body;
  try {
    const searchedCoupon = Coupons.find({
      code,
      userId: req.user._id,
      isActive: true,
    });
    if (!searchedCoupon) {
      return res.status(404).json({ message: "Invalid Coupon" });
    }
    if (searchedCoupon.expiration < new Date()) {
      searchedCoupon.isActive = false;
      await searchedCoupon.save();
      return res.status(404).json({ message: "Coupon expired" });
    }
    return res.status(200).json({
      message: "Valid Coupon",
      code: searchedCoupon.code,
      discountPercentage: searchedCoupon.discountPercentage,
    });
  } catch (error) {
    console.log(`Error in validateCoupon controller : ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};
