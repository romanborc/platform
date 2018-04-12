<div id="sidebar-nav">
    <ul id="dashboard-menu">
        <li class="active">
            <div class="pointer">
                <div class="arrow"></div>
                <div class="arrow_border"></div>
            </div>
            <a href="/dashboard">
                <i class="fa fa-home"></i>
                <span>Home</span>
            </a>
        </li>            
        <li>
            <a href="#/users-list">
                <i class="fa fa-users" aria-hidden="true"></i>
                <span>Users</span>
            </a>
        </li>
        <li>
            <a href="#/results">
                <i class="fa fa-list-ol" aria-hidden="true"></i>
                <span>Results</span>
            </a>
        </li>
        <li class="settings hidden-xs hidden-sm">
            <a href="{{ route('logout') }}" role="button" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
            <i class="fa fa-share"></i>
            <span>Exit</span>
            </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                {{ csrf_field() }}
            </form>
        </li>
    </ul>
</div>
