from fastapi import APIRouter, UploadFile, File, Request
from pydantic import BaseModel
import pandas as pd
import io
import json
from .core import evaluate_conversation, evaluate_db_source

router = APIRouter()

@router.post("/evaluate/file")
async def evaluate_file(file: UploadFile = File(...)):
    content = await file.read()
    filename = file.filename.lower()

    if filename.endswith(".csv"):
        df = pd.read_csv(io.BytesIO(content))
    elif filename.endswith(".json") or filename.endswith(".jsonl"):
        text = content.decode("utf-8").strip()
        # 尝试标准 JSON array
        try:
            data = json.loads(text)
            # 如果是单个对象而不是数组，强行包装一下
            if isinstance(data, dict):
                data = [data]
        except json.JSONDecodeError:
            # 如果不是标准 JSON array，当 jsonlines 处理
            data = [json.loads(line) for line in text.splitlines() if line.strip()]
        # 展开成 DataFrame
        rows = []
        for session in data:
            session_id = session.get("session_id", "")
            model_version = session.get("model_version", "")
            for turn in session.get("dialogue", []):
                rows.append({
                    "session_id": session_id,
                    "model_version": model_version,
                    "user_input": turn.get("user_input", ""),
                    "bot_reply": turn.get("bot_reply", ""),
                })
        df = pd.DataFrame(rows)
    else:
        raise ValueError("只支持 csv、json 或 jsonl 文件上传")

    result = evaluate_conversation(df)
    return result

@router.post("/evaluate/json")
async def evaluate_json(request: Request):
    """
    直接处理粘贴/输入的 JSON（支持单个对话/多个对话的 array）
    前端 payload 结构: { "data": {...} } 或 { "data": [...] }
    """
    data = await request.json()
    conversations = data.get("data")
    # 如果是单个对象而不是数组，强行包装一下
    if isinstance(conversations, dict):
        conversations = [conversations]
    # 展开成 DataFrame，兼容文件上传结构
    rows = []
    for session in conversations:
        session_id = session.get("session_id", "")
        model_version = session.get("model_version", "")
        for turn in session.get("dialogue", []):
            rows.append({
                "session_id": session_id,
                "model_version": model_version,
                "user_input": turn.get("user_input", ""),
                "bot_reply": turn.get("bot_reply", ""),
            })
    df = pd.DataFrame(rows)
    result = evaluate_conversation(df)
    return result

class DBRequest(BaseModel):
    db_type: str
    host: str
    port: int
    user: str
    password: str
    database: str
    table: str
    sql: str = None

@router.post("/evaluate/db")
async def evaluate_db(req: DBRequest):
    df = evaluate_db_source(req)
    result = evaluate_conversation(df)
    return result
