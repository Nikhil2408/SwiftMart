import Product from "../model/product.model.js";

export const getCart = async (req, res) => {
  // I will write the logic later for this
};

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const user = req.user;

  const existingItem = user.cartItems.find(
    (cartItem) => cartItem.product === productId
  );
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    user.cartItems.push({ product: productId, quantity: 1 });
  }
  await user.save();
  res.status(200).json(user.cartItems);
  try {
  } catch (error) {
    console.log(`Error in addToCart controller : ${error.message}`);
    res.status(500).json({ message: `Internal Server Error ${error.message}` });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const updatedCartItems = user.cartItems.filter(
      (cartItem) => cartItem.product !== productId
    );
    user.cartItems = updatedCartItems;
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log(`Error in removeAllFromCart controller : ${error.message}`);
    res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { quantity } = req.body;
    const user = req.user;

    const product = user.cartItems.find(
      (cartItem) => cartItem.product === productId
    );
    if (product) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.find(
          (cartItem) => cartItem.product !== productId
        );
      } else {
        product.quantity = quantity;
      }
      await user.save();
      res.status(200).json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(`Error in updateQuantity controller : ${error.message}`);
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};
