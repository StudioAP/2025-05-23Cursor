'use client'

import { CheckCircle, Circle, Clock } from 'lucide-react'

interface Step {
  id: string
  title: string
  description: string
  completed: boolean
  current: boolean
}

interface ProgressStepsProps {
  hasClassroom: boolean
  hasActiveSubscription: boolean
  hasPublishedClassroom: boolean
}

export default function ProgressSteps({ 
  hasClassroom, 
  hasActiveSubscription, 
  hasPublishedClassroom 
}: ProgressStepsProps) {
  const steps: Step[] = [
    {
      id: 'account',
      title: 'アカウント作成',
      description: '教室運営者アカウントの作成',
      completed: true,
      current: false
    },
    {
      id: 'classroom',
      title: '教室情報登録',
      description: '教室の基本情報を入力',
      completed: hasClassroom,
      current: !hasClassroom
    },
    {
      id: 'payment',
      title: '決済設定',
      description: '月額500円の掲載料金をお支払い',
      completed: hasActiveSubscription,
      current: hasClassroom && !hasActiveSubscription
    },
    {
      id: 'publish',
      title: '教室公開',
      description: '検索結果に表示開始',
      completed: hasPublishedClassroom,
      current: hasActiveSubscription && !hasPublishedClassroom
    }
  ]

  const currentStepIndex = steps.findIndex(step => step.current)
  const progressPercentage = ((steps.filter(step => step.completed).length) / steps.length) * 100

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">セットアップ進捗</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {Math.round(progressPercentage)}% 完了 
          {progressPercentage === 100 && ' 🎉'}
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, _index) => {
          const StepIcon = step.completed ? CheckCircle : step.current ? Clock : Circle
          const iconColor = step.completed 
            ? 'text-green-500' 
            : step.current 
              ? 'text-orange-500' 
              : 'text-gray-300'
          
          return (
            <div key={step.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0 pt-1">
                <StepIcon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${
                    step.completed 
                      ? 'text-green-900' 
                      : step.current 
                        ? 'text-orange-900' 
                        : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  {step.completed && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      完了
                    </span>
                  )}
                  {step.current && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      進行中
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-1 ${
                  step.completed 
                    ? 'text-green-700' 
                    : step.current 
                      ? 'text-orange-700' 
                      : 'text-gray-500'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 次のアクション */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        {currentStepIndex >= 0 && currentStepIndex < steps.length && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-medium text-orange-900 mb-2">
              📌 次にやること
            </h4>
            <p className="text-orange-800 text-sm mb-3">
              {steps[currentStepIndex].title}: {steps[currentStepIndex].description}
            </p>
            {currentStepIndex === 1 && (
              <a 
                href="/dashboard/classrooms/new"
                className="inline-flex items-center px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                教室情報を登録する
              </a>
            )}
            {currentStepIndex === 2 && (
              <a 
                href="/dashboard/subscription"
                className="inline-flex items-center px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                決済設定に進む
              </a>
            )}
            {currentStepIndex === 3 && (
              <p className="text-sm text-orange-700">
                教室情報を確認して公開設定を行ってください。
              </p>
            )}
          </div>
        )}
        
        {progressPercentage === 100 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2 flex items-center">
              🎉 セットアップ完了！
            </h4>
            <p className="text-green-800 text-sm">
              おめでとうございます！あなたの教室が検索結果に表示されるようになりました。
              教室情報の更新や、お問い合わせの確認はいつでもこちらから行えます。
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 