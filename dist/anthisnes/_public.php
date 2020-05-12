<?php
# empêcher l'exécution du fichier en dehors de Dotclear
if (!defined('DC_RC_PATH')) {return;}

l10n::set(dirname(__FILE__).'/locales/'.$_lang.'/public');
$core->tpl->addValue('PaginationLinks', array('tplMyPagination', 'PaginationLinks'));

class tplMyPagination {
	public static function PaginationLinks($attr)
	{
		$p = '<?php
		
		function makePageLink($pageNumber, $linkText) {
			if (isset($GLOBALS["_page_number"])) {
				$current = $GLOBALS["_page_number"];
			} else {
				$current = 1;
			}
			if ($pageNumber != $current) {
				$args = $_SERVER["URL_REQUEST_PART"];
				$args = preg_replace("#(^|/)page/([0-9]+)$#","",$args);
				$url = $GLOBALS["core"]->blog->url.$args;
				if ($pageNumber > 1) {
					$url = preg_replace("#/$#","",$url);
					$url .= "/page/".$pageNumber;
				}
				if (!empty($_GET["q"])) {
					$s = strpos($url,"?") !== false ? "&amp;" : "?";
					$url .= $s."q=".$_GET["q"];
				}
				$linkDesc = $GLOBALS["__l10n"]["Go to page"]."&nbsp;".$linkText;
				return "<li><a href=\"".$url."\" title=\"".$linkDesc."\">".$linkText."</a></li>";
			} else {
				return "<li><span class=\"this\">".$linkText."</span></li>";
			}
		}
		
		if (isset($GLOBALS["_page_number"])) {
			$current = $GLOBALS["_page_number"];
		} else {
			$current = 1;
		}
		if ($_ctx->exists("pagination")) {
			$nb_posts = $_ctx->pagination->f(0);
		}
		
		/* Variables to tweak the pagination system */
		$nb_per_page = $_ctx->post_params["limit"][1];
		$nb_pages = ceil($nb_posts/$nb_per_page);
		$nb_sequence = 2 * 3 + 1;
		
		echo "<ul>";
		?>';
		
		if (!isset($attr['max'])) { $p .= '<?php $nb_page_max = 0; ?>'; } else { $p .= '<?php $nb_page_max = '.$attr['max'].'; ?>'; }
		$p .= '<?php
		
		if ($nb_page_max == 0 || $nb_pages <= $nb_page_max) {
			for ($i = 1; $i <= $nb_pages; $i++) {
				echo makePageLink($i,$i);
			}
		} else {
			echo makePageLink(1,1);
			$min_page = max($current - ($nb_sequence - 1) / 2, 2);
			$max_page = min($current + ($nb_sequence - 1) / 2, $nb_pages - 1);
			if ($min_page > 2) { echo "<li><span class=\"etc\">...</span></li>"; }
			for ($i = $min_page; $i <= $max_page ; $i++) {
				echo makePageLink($i,$i);
			}
			if ($max_page < $nb_pages - 1) { echo "<li><span class=\"etc\">...</span></li>"; }
			echo makePageLink($nb_pages,$nb_pages);
		}
		echo "</ul>";
		
		?>';
		
		return $p;
	}
}

$core->url->register('p401','p401','^p401/(.+)$',array('myURLHandlers','p401'));
$core->url->register('p403','p403','^p403/(.+)$',array('myURLHandlers','p403'));
class myURLHandlers extends dcUrlHandlers
{
	protected static function p401()
	{
		header('Content-Type: text/html; charset=UTF-8');
		http::head(401,'Unauthorized');
		$GLOBALS['core']->url->type = '401';
		echo $GLOBALS['core']->tpl->getData('401.html');
		exit;
	}
	protected static function p403()
	{
		header('Content-Type: text/html; charset=UTF-8');
		http::head(403,'Forbidden');
		$GLOBALS['core']->url->type = '403';
		echo $GLOBALS['core']->tpl->getData('403.html');
		exit;
	}
}
?>