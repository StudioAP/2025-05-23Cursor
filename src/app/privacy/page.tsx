import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ピアノナビ',
  description: 'ピアノナビにおける個人情報の取り扱いについて詳しくご説明します。',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              プライバシーポリシー
            </h1>
            <p className="text-lg text-gray-600">
              最終更新日：2024年5月24日
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. 基本方針
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  株式会社ピアノナビ（以下「当社」といいます）は、当社が提供するピアノ教室検索プラットフォーム「ピアノナビ」（以下「本サービス」といいます）における、
                  ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. 収集する情報
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2.1 ユーザーから直接収集する情報</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>氏名、メールアドレス、電話番号</li>
                      <li>教室情報（教室運営者の場合）</li>
                      <li>お問い合わせ内容</li>
                      <li>その他ユーザーが任意で提供する情報</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2.2 自動的に収集する情報</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>IPアドレス、ブラウザ情報、アクセス日時</li>
                      <li>Cookie及び類似技術による情報</li>
                      <li>サービス利用状況に関する情報</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. 利用目的
                </h2>
                <p className="text-gray-700 mb-4">
                  当社は、収集した個人情報を以下の目的で利用します：
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>本サービスの提供、運営、維持、改善</li>
                  <li>ユーザーサポート及びお問い合わせへの対応</li>
                  <li>教室と生徒のマッチング支援</li>
                  <li>サービスに関する重要な通知の送信</li>
                  <li>利用状況の分析及びサービスの改善</li>
                  <li>不正利用の防止及びセキュリティの向上</li>
                  <li>法令に基づく対応</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. 第三者への提供
                </h2>
                <p className="text-gray-700 mb-4">
                  当社は、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません：
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体又は財産の保護のために必要がある場合</li>
                  <li>公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合</li>
                  <li>国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. 業務委託
                </h2>
                <p className="text-gray-700">
                  当社は、本サービスの運営に必要な業務の一部を外部に委託する場合があります。
                  この場合、委託先に対して適切な監督を行い、個人情報の適切な取扱いを確保します。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Cookie及び類似技術
                </h2>
                <p className="text-gray-700 mb-4">
                  本サービスでは、ユーザー体験の向上のためCookie及び類似技術を使用しています：
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>サービスの機能提供に必要なCookie</li>
                  <li>サービス利用状況の分析のためのCookie</li>
                  <li>ユーザーの設定を保存するためのCookie</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  ブラウザの設定により、Cookieを無効にすることができますが、一部の機能が利用できなくなる場合があります。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. データの保存場所及び移転
                </h2>
                <p className="text-gray-700">
                  本サービスでは、信頼性の高いクラウドサービス（Supabase等）を利用してデータを保存しています。
                  これらのサービスは国際的なセキュリティ基準を満たしており、適切な保護措置が講じられています。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. ユーザーの権利
                </h2>
                <p className="text-gray-700 mb-4">
                  ユーザーは、自身の個人情報について以下の権利を有します：
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>個人情報の開示請求</li>
                  <li>個人情報の訂正・追加・削除の請求</li>
                  <li>個人情報の利用停止・消去の請求</li>
                  <li>個人情報の第三者提供の停止の請求</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  これらの請求については、お問い合わせフォームまたはメールにてご連絡ください。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. セキュリティ
                </h2>
                <p className="text-gray-700">
                  当社は、個人情報の漏洩、滅失、毀損等を防止するため、適切な技術的、組織的安全管理措置を講じています。
                  また、個人情報へのアクセス権限を適切に管理し、定期的なセキュリティ監査を実施しています。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. 個人情報の保存期間
                </h2>
                <p className="text-gray-700">
                  当社は、個人情報を利用目的の達成に必要な期間内でのみ保存し、その後は適切に削除または匿名化いたします。
                  ただし、法令により保存が義務付けられている場合はその限りではありません。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. 未成年者の個人情報
                </h2>
                <p className="text-gray-700">
                  本サービスは、未成年者からの個人情報の収集について、保護者の同意を必要とします。
                  未成年者が保護者の同意なく個人情報を提供した場合、保護者からの削除要請に応じて当該情報を削除いたします。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  12. プライバシーポリシーの変更
                </h2>
                <p className="text-gray-700">
                  当社は、法令の変更やサービスの改善等に伴い、本ポリシーを変更する場合があります。
                  重要な変更については、サービス内での通知または当社ウェブサイトでの公表により、ユーザーにお知らせいたします。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  13. お問い合わせ窓口
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    個人情報の取扱いに関するお問い合わせは、以下までご連絡ください：
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>株式会社ピアノナビ</strong></p>
                    <p>個人情報管理責任者：代表取締役 ABE</p>
                    <p>メールアドレス：privacy@piano-navi.com</p>
                    <p>電話番号：0120-123-456（平日9:00〜18:00）</p>
                    <p>住所：〒100-0001 東京都千代田区千代田1-1-1 ピアノナビビル 3F</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  14. 適用される法律・管轄裁判所
                </h2>
                <p className="text-gray-700">
                  本ポリシーは日本法に準拠し、本ポリシーに関して紛争が生じた場合には、
                  東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                </p>
              </section>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              本プライバシーポリシーは2024年5月24日より有効です。
            </p>
            <div className="mt-4">
              <a
                href="/contact"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                ご質問がある場合はお問い合わせください
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 