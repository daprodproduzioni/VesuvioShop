# Vesuvio Quantico Bot - Python Backend
# Requires: pip install aiogram

from aiogram import Bot, Dispatcher, types, Router
from aiogram.types import WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import Command
import json
import asyncio

# Config
BOT_TOKEN = "8784323373:AAGqQopxl_1PVtbUMVx5aod9oPNvlzysdbA"
MINI_APP_URL = "https://cammo22.github.io/VesuvioShop/"  # Update after deployment

# Album data
ALBUM_PRICE = 999  # Stars
ALBUM_TRACKS = 34

# Setup
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()
router = Router()

# /start command
@router.command("start")
async def start_handler(message: types.Message):
    """Welcome message with Mini App button"""
    
    # Inline keyboard with Mini App button
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🛒 Apri Negozio", web_app=WebAppInfo(url=MINI_APP_URL))],
        [InlineKeyboardButton(text="ℹ️ Info", callback_data="info")],
        [InlineKeyboardButton(text="🎵 Preview", callback_data="preview")]
    ])
    
    await message.answer(
        f"🌋 <b>Vesuvio Quantico Shop</b>\n\n"
        f"34 Tracce di musica napoletana AI\n"
        f"💰 Prezzo: ⭐ {ALBUM_PRICE} Stars\n"
        f"📦 Formato: FLAC + MP3\n\n"
        f"Tap 'Apri Negozio' per acquistare!",
        reply_markup=keyboard,
        parse_mode="HTML"
    )

# /catalog command
@router.command("catalog")
async def catalog_handler(message: types.Message):
    """Send album invoice directly"""
    
    await send_invoice(message, ALBUM_PRICE, album_full=True)

# Send Invoice (Telegram Stars)
async def send_invoice(message: types.Message, price: int, album_full: bool = False):
    """Send Stars invoice for digital goods"""
    
    title = "Vesuvio Quantico - Album Completo" if album_full else "Tracce Singole"
    description = f"Album completo: 34 tracce di musica napoletana AI"
    
    # sendInvoice for Stars (empty provider_token for digital goods)
    await bot.send_invoice(
        chat_id=message.chat.id,
        title=title,
        description=description,
        payload=f"vesuvio_{'album' if album_full else 'tracks'}",
        provider_token="",  # Empty for Stars
        currency="XTR",  # Telegram Stars
        prices=[types.LabeledPrice(label="Album", amount=price)],
        photo_url="https://cammo22.github.io/Portfolio/assets/cover.jpg",  # Replace with real URL
        is_flexible=False
    )

# Pre-checkout handler
@router.pre_checkout_query()
async def pre_checkout_handler(pre_checkout_query: types.PreCheckoutQuery):
    """Approve pre-checkout (must respond within 10 seconds)"""
    
    # Approve the payment
    await bot.answer_pre_checkout_query(
        pre_checkout_query_id=pre_checkout_query.id,
        ok=True
    )

# Successful payment handler
@router.message(types.ContentType.SUCCESSFUL_PAYMENT)
async def successful_payment_handler(message: types.Message):
    """Handle successful Stars payment - deliver files"""
    
    payment = message.successful_payment
    
    # Get user info
    user_id = message.from_user.id
    username = message.from_user.username or "utente"
    
    # Log purchase
    print(f"✅ Payment successful: {username} paid {payment.total_amount} Stars")
    
    # Send download link
    await message.answer(
        f"🎉 <b>Pagamento confermato!</b>\n\n"
        f"Grazie {username} per l'acquisto!\n\n"
        f"📥 <b>Download Album:</b>\n"
        f"Invio file in corso...\n\n"
        f"Formato: FLAC + MP3 (320kbps)\n"
        f"Dimensione: ~500MB\n",
        parse_mode="HTML"
    )
    
    # Send file (split if needed - max 50MB per file for bots)
    # For production: send ZIP or Google Drive link
    await message.answer_document(
        document=types.FSInputFile("vesuvio-quantico-info.txt"),
        caption="📦 Info album + Tracklist"
    )
    
    # Option: send Google Drive link for full download
    await message.answer(
        "📥 <b>Download Completo:</b>\n"
        "https://drive.google.com/...",  # Replace with real link
        parse_mode="HTML"
    )

# Callback handlers
@router.callback_query(lambda c: c.data == "info")
async def info_handler(callback: types.CallbackQuery):
    """Album info"""
    await callback.message.answer(
        "🌋 <b>Vesuvio Quantico</b>\n\n"
        "34 Tracce originali di musica napoletana\n"
        "Prodotte 100% con AI (Ollama, Audiino)\n\n"
        "Formati: FLAC, MP3 320kbps, WAV\n"
        "Durata totale: ~80 minuti\n\n"
        "© 2026 DaProdProduzioni"
    )
    await callback.answer()

@router.callback_query(lambda c: c.data == "preview")
async def preview_handler(callback: types.CallbackQuery):
    """Track preview"""
    await callback.message.answer(
        "🎵 <b>Preview Tracks</b>\n\n"
        "Preview audio coming soon!\n"
        "Prossimo update: player integrato."
    )
    await callback.answer()

# Main
async def main():
    dp.include_router(router)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
