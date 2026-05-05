export const pageHTML = `
    <section style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:#0D1117;position:relative;overflow:hidden;padding:60px 20px;">
        <div style="position:absolute;width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(63,185,80,0.08) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
        <div style="max-width:560px;margin:0 auto;position:relative;z-index:1;">

            <!-- Check animation -->
            <div style="width:80px;height:80px;background:rgba(63,185,80,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 28px;animation:tyBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;">
                <i class="fa-solid fa-check" style="color:#3FB950;font-size:36px;"></i>
            </div>

            <!-- Title -->
            <h1 style="color:#fff;font-size:clamp(1.8rem,4vw,2.5rem);font-weight:800;margin-bottom:12px;">
                Sua vaga est&aacute; garantida!
            </h1>

            <p style="color:#8B949E;font-size:1.1rem;line-height:1.6;margin-bottom:32px;">
                Voc&ecirc; vai receber o link da reuni&atilde;o no seu e-mail. Fique atento &agrave; caixa de entrada.
            </p>

            <!-- Info card -->
            <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:16px;padding:28px 24px;margin-bottom:32px;text-align:left;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                    <div style="width:44px;height:44px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="fas fa-envelope" style="color:#ffba1a;font-size:18px;"></i>
                    </div>
                    <div>
                        <strong style="color:#fff;font-size:15px;">Link enviado por e-mail</strong>
                        <p style="color:#8B949E;font-size:13px;margin:2px 0 0;">Verifique tamb&eacute;m a pasta de spam.</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="fas fa-user-group" style="color:#ffba1a;font-size:18px;"></i>
                    </div>
                    <div>
                        <strong style="color:#fff;font-size:15px;">Masterclass com Christian Hart</strong>
                        <p style="color:#8B949E;font-size:13px;margin:2px 0 0;">Toda quarta-feira &agrave;s 18h.</p>
                    </div>
                </div>
            </div>

            <!-- Adicionar ao calendário -->
            <div style="margin-bottom:32px;">
                <p style="color:#fff;font-size:15px;font-weight:700;margin-bottom:16px;">
                    <i class="fa-solid fa-calendar-plus" style="color:#ffba1a;margin-right:8px;"></i>Adicione na sua agenda
                </p>
                <div id="calBtns" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;"></div>
                <p style="color:#8B949E;font-size:12px;margin-top:14px;">Lembrete autom&aacute;tico 1h antes do in&iacute;cio</p>
            </div>

            <!-- Back link -->
            <a href="/live/chris" style="display:inline-block;color:#8B949E;font-size:14px;text-decoration:underline;text-underline-offset:4px;">
                <i class="fa-solid fa-arrow-left" style="margin-right:6px;"></i>Voltar para a p&aacute;gina do evento
            </a>
        </div>
    </section>

    <style>
    @keyframes tyBounce { 0% { transform: scale(0); } 100% { transform: scale(1); } }
    </style>

    <!-- Add to calendar -->
    <script>
    (function() {
        var EVENT = {
            title: 'Masterclass Consultores — Christian Hart',
            description: 'Masterclass quinzenal com Christian Hart (Diretor de Canais — Grupo GSN). O link de acesso é enviado pelo grupo fechado de WhatsApp.',
            location: 'Grupo fechado de WhatsApp da Masterclass',
            durationHours: 1,
            dayOfWeek: 3,
            hourBRT: 18
        };

        function nextOccurrence() {
            var now = new Date();
            var nowUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes()));
            var target = new Date(Date.UTC(nowUtc.getUTCFullYear(), nowUtc.getUTCMonth(), nowUtc.getUTCDate(), EVENT.hourBRT + 3, 0, 0));
            var diff = (EVENT.dayOfWeek - target.getUTCDay() + 7) % 7;
            target.setUTCDate(target.getUTCDate() + diff);
            if (target.getTime() <= nowUtc.getTime()) {
                target.setUTCDate(target.getUTCDate() + 7);
            }
            return target;
        }

        function fmtUTC(d) {
            var pad = function(n) { return String(n).padStart(2, '0'); };
            return d.getUTCFullYear() + pad(d.getUTCMonth()+1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + '00Z';
        }
        function fmtISO(d) {
            var pad = function(n) { return String(n).padStart(2, '0'); };
            return d.getUTCFullYear() + '-' + pad(d.getUTCMonth()+1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':00';
        }

        var start = nextOccurrence();
        var end = new Date(start.getTime() + EVENT.durationHours * 3600000);
        var startStr = fmtUTC(start);
        var endStr = fmtUTC(end);

        var google = 'https://www.google.com/calendar/render?action=TEMPLATE'
            + '&text=' + encodeURIComponent(EVENT.title)
            + '&dates=' + startStr + '/' + endStr
            + '&details=' + encodeURIComponent(EVENT.description)
            + '&location=' + encodeURIComponent(EVENT.location);

        var yahoo = 'https://calendar.yahoo.com/?v=60'
            + '&title=' + encodeURIComponent(EVENT.title)
            + '&st=' + startStr
            + '&et=' + endStr
            + '&desc=' + encodeURIComponent(EVENT.description)
            + '&in_loc=' + encodeURIComponent(EVENT.location);

        var office365 = 'https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent'
            + '&subject=' + encodeURIComponent(EVENT.title)
            + '&startdt=' + encodeURIComponent(fmtISO(start) + 'Z')
            + '&enddt=' + encodeURIComponent(fmtISO(end) + 'Z')
            + '&body=' + encodeURIComponent(EVENT.description)
            + '&location=' + encodeURIComponent(EVENT.location);

        var outlook = office365.replace('outlook.office.com', 'outlook.live.com');

        var ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Orbit Gestao//Masterclass//PT',
            'CALSCALE:GREGORIAN',
            'BEGIN:VEVENT',
            'UID:masterclass-chris-' + start.getTime() + '@orbitgestao.com.br',
            'DTSTAMP:' + fmtUTC(new Date()),
            'DTSTART:' + startStr,
            'DTEND:' + endStr,
            'SUMMARY:' + EVENT.title,
            'DESCRIPTION:' + EVENT.description,
            'LOCATION:' + EVENT.location,
            'BEGIN:VALARM',
            'TRIGGER:-PT1H',
            'ACTION:DISPLAY',
            'DESCRIPTION:Masterclass começa em 1h',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\\r\\n');

        function downloadIcs() {
            var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'masterclass-orbit.ics';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        var btnStyle = 'display:inline-flex;align-items:center;gap:8px;padding:10px 16px;background:#1C2333;border:1px solid rgba(255,186,26,0.25);border-radius:10px;color:#fff;font-size:13px;font-weight:600;text-decoration:none;cursor:pointer;transition:all 0.2s;font-family:inherit;';

        var container = document.getElementById('calBtns');
        if (!container) return;

        var buttons = [
            { label: 'Google', icon: 'fa-brands fa-google', color: '#4285F4', href: google, target: '_blank' },
            { label: 'Apple', icon: 'fa-brands fa-apple', color: '#fff', onClick: downloadIcs },
            { label: 'Outlook', icon: 'fa-brands fa-microsoft', color: '#0078D4', href: outlook, target: '_blank' },
            { label: 'Office 365', icon: 'fa-solid fa-briefcase', color: '#EA3E23', href: office365, target: '_blank' },
            { label: 'Yahoo', icon: 'fa-brands fa-yahoo', color: '#6001D2', href: yahoo, target: '_blank' }
        ];

        buttons.forEach(function(b) {
            var el;
            if (b.onClick) {
                el = document.createElement('button');
                el.type = 'button';
                el.addEventListener('click', b.onClick);
            } else {
                el = document.createElement('a');
                el.href = b.href;
                el.target = b.target || '_self';
                el.rel = 'noopener';
            }
            el.style.cssText = btnStyle;
            el.innerHTML = '<i class="' + b.icon + '" style="color:' + b.color + ';font-size:16px;"></i><span>' + b.label + '</span>';
            el.addEventListener('mouseenter', function() { el.style.borderColor = '#ffba1a'; el.style.transform = 'translateY(-1px)'; });
            el.addEventListener('mouseleave', function() { el.style.borderColor = 'rgba(255,186,26,0.25)'; el.style.transform = 'translateY(0)'; });
            container.appendChild(el);
        });
    })();
    </script>
`;
