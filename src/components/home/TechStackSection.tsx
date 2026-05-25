'use client'

import SectionTag from '@/components/ui/SectionTag'
import FadeUp from '@/components/ui/FadeUp'

const stack = [
  {
    category: 'BACKEND',
    color: 'text-primary',
    items: ['.NET 3.1–10', 'ASP.NET Core', 'C#', 'Entity Framework Core', 'Dapper', 'Clean Architecture', 'CQRS', 'MediatR', 'Hangfire', 'Node.js', 'REST', 'GraphQL'],
  },
  {
    category: 'AUTH & IDENTITY',
    color: 'text-blue-400',
    items: ['OAuth 2.0', 'OIDC', 'SAML 2.0', 'PKCE', 'Azure AD / Entra ID', 'Auth0', 'Okta', 'Keycloak', 'IdentityServer4', 'Duende IdentityServer', 'JWT', 'MFA / TOTP', 'WebAuthn / FIDO2'],
  },
  {
    category: 'AZURE PLATFORM',
    color: 'text-cyan-400',
    items: ['Azure App Service', 'Azure Functions', 'Azure Service Bus', 'Azure Blob Storage', 'Azure SignalR', 'Azure API Management', 'Azure Key Vault', 'Azure Monitor', 'Application Insights', 'Container Apps', 'Azure OpenAI', 'Cosmos DB'],
  },
  {
    category: 'PAYMENTS',
    color: 'text-green-400',
    items: ['Stripe', 'Stripe Connect', 'Stripe Billing', 'PayPal REST', 'Braintree', 'Mollie', 'Adyen', 'GoCardless SEPA', 'Prime Trust', 'Synapse', 'Webhook idempotency', 'Payment reconciliation'],
  },
  {
    category: 'MESSAGING & COMMS',
    color: 'text-purple-400',
    items: ['Twilio SMS', 'Twilio Voice', 'Twilio Verify OTP', 'Vonage / Nexmo', 'SendGrid', 'Mailgun', 'Azure Communication Services', 'Firebase FCM', 'RabbitMQ', 'Azure Service Bus', 'Dead-letter handling', 'Retry policies'],
  },
  {
    category: 'FRONTEND',
    color: 'text-yellow-400',
    items: ['React 18', 'Next.js 14', 'TypeScript', 'Angular 16+', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'React Query'],
  },
  {
    category: 'DATA & ANALYTICS',
    color: 'text-orange-400',
    items: ['SQL Server 2016–2022', 'PostgreSQL', 'MongoDB', 'CosmosDB', 'LINQ', 'Stored Procedures', 'Query optimisation', 'Index tuning'],
  },
  {
    category: 'QA & TESTING',
    color: 'text-red-400',
    items: ['Playwright', 'Selenium', 'Cypress', 'k6', 'JMeter', 'OWASP ZAP', 'Manual testing', 'API testing'],
  },
  {
    category: 'DESIGN',
    color: 'text-pink-400',
    items: ['Figma', 'Adobe XD', 'Design Systems', 'Responsive design', 'Wireframing', 'Prototyping', 'Developer handoff', 'Accessibility audit'],
  },
  {
    category: 'DEVOPS & CI/CD',
    color: 'text-teal-400',
    items: ['Azure DevOps', 'GitHub Actions', 'Docker', 'Terraform', 'Kubernetes (AKS)', 'CI/CD pipelines', 'IIS', 'NGINX'],
  },
]

export default function TechStackSection() {
  return (
    <section className="section bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-12">
          <SectionTag label="Technology" className="mb-4" />
          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl mb-4">
            The complete technology picture
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl">
            Every technology listed here reflects hands-on production experience — built and
            shipped on live enterprise systems, not just ticked on a skills matrix.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {stack.map((group) => (
            <div
              key={group.category}
              className="bg-dark-2 border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition-colors"
            >
              <div className={`text-xs font-bold tracking-widest mb-4 ${group.color}`}>
                {group.category}
              </div>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-500">
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${group.color}`} style={{ background: 'currentColor' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
