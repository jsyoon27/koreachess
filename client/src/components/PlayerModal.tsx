import { useEffect, useState } from 'react';
import './PlayerModal.css';

type PlayerNames = { CHO: string; HAN: string };

type Props = {
  isOpen: boolean;
  initialNames: PlayerNames;
  onConfirm: (names: PlayerNames) => void;
  onClose: () => void;
};

const PlayerModal = ({ isOpen, initialNames, onConfirm, onClose }: Props) => {
  const [names, setNames] = useState<PlayerNames>(initialNames);

  useEffect(() => {
    if (isOpen) {
      setNames(initialNames);
    }
  }, [initialNames, isOpen]);

  if (!isOpen) return null;

  const handleChange = (key: keyof PlayerNames, value: string) => {
    setNames((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(names);
  };

  const isDisabled = !names.CHO.trim() || !names.HAN.trim();

  return (
    <div className="player-modal-overlay" role="dialog" aria-modal="true">
      <div className="player-modal">
        <div className="player-modal__header">
          <div>
            <div className="player-modal__title">플레이어 설정</div>
            <div className="player-modal__subtitle">각 플레이어의 이름을 입력하세요</div>
          </div>
          <button className="player-modal__close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="player-modal__section">
            <div className="player-modal__label">
              <span className="dot dot--han" aria-hidden />
              한 (漢) - 빨강
            </div>
            <input
              value={names.HAN}
              onChange={(e) => handleChange('HAN', e.target.value)}
              placeholder="플레이어 1 이름"
              className="player-modal__input"
            />
          </div>

          <div className="player-modal__section">
            <div className="player-modal__label">
              <span className="dot dot--cho" aria-hidden />
              초 (楚) - 녹색
            </div>
            <input
              value={names.CHO}
              onChange={(e) => handleChange('CHO', e.target.value)}
              placeholder="플레이어 2 이름"
              className="player-modal__input"
            />
          </div>

          <div className="player-modal__actions">
            <button type="submit" className="player-modal__submit" disabled={isDisabled}>
              ▶ 게임 시작
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerModal;
