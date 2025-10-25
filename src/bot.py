from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from aiogram.utils import executor
import os

# Токен бота из BotFather
API_TOKEN = "7877619517:AAHHU8RkVTUnzsBS0bakAAGJs_ha3cS2ieY"

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)