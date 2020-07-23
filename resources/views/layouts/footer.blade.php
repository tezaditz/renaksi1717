<footer class="main-footer">
    <!-- To the right -->
    <strong>{{CRUDBooster::getSetting('footer_web')}}</strong>
    <!-- Default to the left -->
    <div class="pull-{{ trans('crudbooster.right') }} hidden-xs">
    <strong>{{ trans('crudbooster.copyright') }} &copy; <?php echo date('Y') ?>. KEMENTERIAN KESEHATAN RI</strong>
    </div>
</footer>