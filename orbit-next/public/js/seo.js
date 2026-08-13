// SEO Schema Markup - Auto-inject on all pages
(function() {
    // Organization Schema
    var org = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Orbit",
        "alternateName": "Orbit Gestão",
        "url": "https://orbitgestao.com.br",
        "logo": "https://orbitgestao.com.br/images/logo-orbit-white.png",
        "description": "Plataforma de gestão empresarial com agentes de IA integrados. Grupo GSN - 30 anos, 8.000+ empresas.",
        "foundingDate": "1996",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": "50+" },
        "address": [
            {
                "@type": "PostalAddress",
                "streetAddress": "Square SC",
                "addressLocality": "Florianópolis",
                "addressRegion": "SC",
                "addressCountry": "BR"
            },
            {
                "@type": "PostalAddress",
                "name": "Bainbridge World Center",
                "streetAddress": "14051 International Dr",
                "addressLocality": "Orlando",
                "addressRegion": "FL",
                "postalCode": "32821",
                "addressCountry": "US"
            }
        ],
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+55-48-9814-9776",
                "contactType": "sales",
                "areaServed": "BR"
            },
            {
                "@type": "ContactPoint",
                "telephone": "+1-954-818-2885",
                "contactType": "sales",
                "areaServed": "US"
            }
        ],
        "parentOrganization": {
            "@type": "Organization",
            "name": "Grupo GSN",
            "description": "Maior grupo de consultoria em gestão e ISO do Brasil"
        },
        "sameAs": []
    };

    // WebSite Schema
    var site = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Orbit",
        "url": "https://orbitgestao.com.br",
        "description": "Plataforma de gestão com IA. Contrate um time que executa.",
        "publisher": { "@id": "https://orbitgestao.com.br/#organization" }
    };

    // Inject
    function injectSchema(data) {
        var script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }

    injectSchema(org);
    injectSchema(site);
})();
