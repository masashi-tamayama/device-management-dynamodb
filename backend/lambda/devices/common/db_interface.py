import os
import logging
from typing import Dict, List, Optional
from abc import ABC, abstractmethod

logger = logging.getLogger(__name__)

class DatabaseInterface(ABC):
    """データベースインターフェースの抽象基底クラス"""
    
    @abstractmethod
    def get_all_devices(self) -> List[Dict]:
        pass

    @abstractmethod
    def get_device(self, device_id: str) -> Optional[Dict]:
        pass

    @abstractmethod
    def create_device(self, device_data: Dict) -> Dict:
        pass

    @abstractmethod
    def update_device(self, device_id: str, device_data: Dict) -> Optional[Dict]:
        pass

    @abstractmethod
    def delete_device(self, device_id: str) -> bool:
        pass

def get_db_interface() -> DatabaseInterface:
    """データベースインターフェースのファクトリ関数"""
    from .dynamodb import DynamoDBInterface
    logger.info("Using DynamoDB interface")
    return DynamoDBInterface() 