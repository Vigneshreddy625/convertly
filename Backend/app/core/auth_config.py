from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

# JWT Configuration
SECRET_KEY = "your-secret-key-keep-it-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password Context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

# In-memory database (for demonstration)
fake_users_db = {}