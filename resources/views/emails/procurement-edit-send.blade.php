@component('mail::layout')
    {{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
            Измененная Закупка
        @endcomponent
    @endslot

    {{-- Body --}}
    <!-- Body here -->

    {{-- Subcopy --}}
    @slot('subcopy')
        @component('mail::table')

		Заказчик: {{ $data['customer'] }}                     
		id Закупки {{ $data['id_procurement'] }}                 
		Подать до {{ $data['offers_period_end'] }}                           
		Аукцион {{ $data['auction_period_end'] }}                 
		Сумма {{ $data['amount'] }}
		@endcomponent

		@component('mail::button', ['url' => 'https://zakupki.prom.ua/gov/tenders/'.$data['id_procurement'] ])
		Перейти на закупку
		@endcomponent
    @endslot


    {{-- Footer --}}
    @slot('footer')
        @component('mail::footer')
            © {{ date('Y') }} Platform
        @endcomponent
    @endslot
@endcomponent