const Menu = require("../models/Menu");

const createMenu = async (req, res) => {
  try {
    const { day, breakfast, lunch, dinner } = req.body;

    const existingMenu = await Menu.findOne({ day });

if (existingMenu) {
  return res.status(400).json({
    message: "Menu for this day already exists",
  });
}

    const menu = await Menu.create({
      day,
      breakfast,
      lunch,
      dinner,
    });

    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { breakfast, lunch, dinner } = req.body;

    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      {
        breakfast,
        lunch,
        dinner,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMenu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    }

    res.status(200).json({
      message: "Menu updated successfully",
      menu: updatedMenu,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);

    if (!menu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    }

    res.status(200).json({
      message: "Menu deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
};