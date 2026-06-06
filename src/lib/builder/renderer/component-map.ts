/**
 * Component Map
 *
 * Maps component slugs to their actual Svelte component constructors.
 * Used by BlockRenderer to resolve which component to render for each BlockNode.
 */

import type { Component } from "svelte";

// Layout primitives
import SectionPrimitive from "./primitives/Section.svelte";
import ContainerPrimitive from "./primitives/Container.svelte";
import GridPrimitive from "./primitives/Grid.svelte";
import FlexPrimitive from "./primitives/Flex.svelte";
import TextPrimitive from "./primitives/Text.svelte";
import ImagePrimitive from "./primitives/Image.svelte";
import SpacerPrimitive from "./primitives/Spacer.svelte";

// Content & navigation primitives
import LinkPrimitive from "./primitives/Link.svelte";
import DividerPrimitive from "./primitives/Divider.svelte";
import BadgePrimitive from "./primitives/BadgePrimitive.svelte";
import ListPrimitive from "./primitives/List.svelte";
import CardPrimitive from "./primitives/CardPrimitive.svelte";
import CardHeaderPrimitive from "./primitives/CardHeaderPrimitive.svelte";
import CardContentPrimitive from "./primitives/CardContentPrimitive.svelte";
import CardFooterPrimitive from "./primitives/CardFooterPrimitive.svelte";
import RichTextPrimitive from "./primitives/RichText.svelte";
import IconPrimitive from "./primitives/IconPrimitive.svelte";
import DocumentPrimitive from "./primitives/Document.svelte";
import NavPrimitive from "./primitives/Nav.svelte";
import FooterPrimitive from "./primitives/FooterBlock.svelte";
import TabsPrimitive from "./primitives/TabsPrimitive.svelte";
import TabItemPrimitive from "./primitives/TabItemPrimitive.svelte";
import MathsBackgroundPrimitive from "./primitives/MathsBackground.svelte";

// Domain components (structured academic-homepage sections)
import HeaderDomain from "./domain/Header.svelte";
import BioDomain from "./domain/Bio.svelte";
import CoursesDomain from "./domain/Courses.svelte";
import BooksDomain from "./domain/Books.svelte";
import PublicationsDomain from "./domain/Publications.svelte";
import ContactDomain from "./domain/Contact.svelte";
import FooterDomain from "./domain/Footer.svelte";

// FancyUI components (direct — these accept props only, no snippet wiring needed)
import {
	BorderBeam,
	GlowBorder,
	Meteors,
	Marquee,
	Ripple,
	SparklesText,
	ColourfulText,
	NumberTicker,
	FlipWords,
	CardSpotlight,
	NeonBorder,
	LetterPullup,
	BoxReveal,
	HyperText,
	Focus,
	Sparkles,
	Confetti,
} from "fancy-ui-svelte";

// Adapter wrappers (for components that use snippets instead of plain props)
import ShimmerButtonAdapter from "./adapters/ShimmerButtonAdapter.svelte";
import RainbowButtonAdapter from "./adapters/RainbowButtonAdapter.svelte";
import FlipCardAdapter from "./adapters/FlipCardAdapter.svelte";
import BentoGridItemAdapter from "./adapters/BentoGridItemAdapter.svelte";
import ContainerScrollAdapter from "./adapters/ContainerScrollAdapter.svelte";
import InteractiveHoverButtonAdapter from "./adapters/InteractiveHoverButtonAdapter.svelte";
import GradientButtonAdapter from "./adapters/GradientButtonAdapter.svelte";
import BlurRevealAdapter from "./adapters/BlurRevealAdapter.svelte";
import DirectionAwareHoverAdapter from "./adapters/DirectionAwareHoverAdapter.svelte";
import Card3DAdapter from "./adapters/Card3DAdapter.svelte";
import BentoGridAdapter from "./adapters/BentoGridAdapter.svelte";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = Component<any>;

/**
 * Static map from slug to Svelte component.
 * Add new components here as they become builder-compatible.
 */
export const componentMap: Record<string, AnyComponent> = {
	// Layout primitives
	_section: SectionPrimitive,
	_container: ContainerPrimitive,
	_grid: GridPrimitive,
	_flex: FlexPrimitive,
	_text: TextPrimitive,
	_image: ImagePrimitive,
	_spacer: SpacerPrimitive,

	// Content & navigation primitives
	_link: LinkPrimitive,
	_divider: DividerPrimitive,
	_badge: BadgePrimitive,
	_list: ListPrimitive,
	_card: CardPrimitive,
	"_card-header": CardHeaderPrimitive,
	"_card-content": CardContentPrimitive,
	"_card-footer": CardFooterPrimitive,
	"_rich-text": RichTextPrimitive,
	_icon: IconPrimitive,
	_document: DocumentPrimitive,
	_nav: NavPrimitive,
	_footer: FooterPrimitive,
	_tabs: TabsPrimitive,
	"_tab-item": TabItemPrimitive,
	"_maths-background": MathsBackgroundPrimitive,

	// Domain components
	"domain-header": HeaderDomain as AnyComponent,
	"domain-bio": BioDomain as AnyComponent,
	"domain-courses": CoursesDomain as AnyComponent,
	"domain-books": BooksDomain as AnyComponent,
	"domain-publications": PublicationsDomain as AnyComponent,
	"domain-contact": ContactDomain as AnyComponent,
	"domain-footer": FooterDomain as AnyComponent,

	// FancyUI components
	"border-beam": BorderBeam as AnyComponent,
	"glow-border": GlowBorder as AnyComponent,
	meteors: Meteors as AnyComponent,
	"shimmer-button": ShimmerButtonAdapter as AnyComponent,
	"rainbow-button": RainbowButtonAdapter as AnyComponent,
	marquee: Marquee as AnyComponent,
	ripple: Ripple as AnyComponent,
	"sparkles-text": SparklesText as AnyComponent,
	"colourful-text": ColourfulText as AnyComponent,
	"number-ticker": NumberTicker as AnyComponent,
	"flip-words": FlipWords as AnyComponent,
	"card-spotlight": CardSpotlight as AnyComponent,
	"neon-border": NeonBorder as AnyComponent,
	"letter-pullup": LetterPullup as AnyComponent,
	"box-reveal": BoxReveal as AnyComponent,
	"hyper-text": HyperText as AnyComponent,
	focus: Focus as AnyComponent,
	sparkles: Sparkles as AnyComponent,
	confetti: Confetti as AnyComponent,

	// Adapters for multi-snippet components
	"flip-card": FlipCardAdapter as AnyComponent,
	"bento-grid-item": BentoGridItemAdapter as AnyComponent,
	"container-scroll": ContainerScrollAdapter as AnyComponent,
	"interactive-hover-button": InteractiveHoverButtonAdapter as AnyComponent,
	"gradient-button": GradientButtonAdapter as AnyComponent,
	"blur-reveal": BlurRevealAdapter as AnyComponent,
	"direction-aware-hover": DirectionAwareHoverAdapter as AnyComponent,
	"card-3d": Card3DAdapter as AnyComponent,
	"bento-grid": BentoGridAdapter as AnyComponent,
};

/** Resolve a component slug to its Svelte constructor */
export function resolveComponent(slug: string): AnyComponent | undefined {
	return componentMap[slug];
}
