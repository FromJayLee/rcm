'use client';

import { useEditor } from '../../context/EditorContext';
import { Step1Template } from './Step1Template';
import { Step2Content } from './Step2Content';
import { Step3Background } from './Step3Background';
import { Step4Export } from './Step4Export';

export function EditorPanel() {
  const { state } = useEditor();

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return <Step1Template />;
      case 2:
        return <Step2Content />;
      case 3:
        return <Step3Background />;
      case 4:
        return <Step4Export />;
      default:
        return <Step1Template />;
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      {renderStep()}
    </div>
  );
}
